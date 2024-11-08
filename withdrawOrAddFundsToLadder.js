const sequelize = require('../config/database');
const Ladder = require('../model/ladderModel'); 
const dd_orders = require('../model/orderModel'); 

const withdrawOrAddFundsToLadder = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
        const lad_user_id = req.params.id; 
        const { lad_id, new_cash_allocated, new_cash_needed, new_order_size, new_step_size } = req.body;

        
        if (!lad_id || !lad_user_id) {
            return res.status(400).json({ message: "lad_id and lad_user_id are required." });
        }

        
        const ladder = await Ladder.findOne({ where: { lad_id, lad_user_id } });

        if (!ladder) {
            return res.status(404).json({ message: "Ladder not found for the specified user." });
        }

        ladder.cash_needed = new_cash_needed;          
        ladder.order_size = new_order_size;           
        ladder.step_size = new_step_size;            

        
        await ladder.save({ transaction });

       
        const currentPrice = ladder.currentPrice;

       
        if (!ladder.lad_position_id) {
            return res.status(400).json({ message: "Ladder position ID cannot be null." });
        }

        
        const buyOrderData = {
            order_type: "BUY",
            order_status: "OPEN",
            order_user_id: lad_user_id,
            order_position_id: ladder.lad_position_id,
            order_automated: true,
            order_open_price: currentPrice - ladder.step_size,
            order_trading_mode: ladder.lad_trading_mode,
            order_units: new_order_size,
            order_closed_units: 0,
            order_cash_gain: 0,
            order_realized_profit: 0,
            order_exchange: ladder.lad_exchange,
            order_ticker_id: ladder.lad_ticker_id,
            order_stock_name: ladder.lad_ticker,
            order_follow_up: "Buy&Sell",
        };

        const sellOrderData = {
            order_type: "SELL",
            order_status: "OPEN",
            order_user_id: lad_user_id,
            order_position_id: ladder.lad_position_id,
            order_automated: true,
            order_open_price: currentPrice + ladder.step_size,
            order_trading_mode: ladder.lad_trading_mode,
            order_units: new_order_size,
            order_closed_units: 0,
            order_cash_gain: 0,
            order_realized_profit: 0,
            order_exchange: ladder.lad_exchange,
            order_ticker_id: ladder.lad_ticker_id,
            order_stock_name: ladder.lad_ticker,
            order_follow_up: "Buy&Sell",
        };

       
        await dd_orders.create(buyOrderData, { transaction });
        await dd_orders.create(sellOrderData, { transaction });

       
        await transaction.commit();

        res.status(200).json({ message: "Ladder updated successfully, and orders created.", ladder });
    } catch (error) {
      
        await transaction.rollback();
        console.error("Error updating ladder and creating orders:", error);
        res.status(500).json({ message: "Error updating ladder and creating orders", error });
    }
};

module.exports = {
    withdrawOrAddFundsToLadder,
};
