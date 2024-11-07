const sequelize = require("../config/database");
const Ladder = require("../model/ladderModel");

const modifyLadder = async (req, res) => {
const transaction = await sequelize.transaction();
    
    try {
        const lad_user_id = req.params.userId;  
        const { lad_id, new_step_size, new_target_price, new_order_size } = req.body;

        
        if (!lad_id || !lad_user_id) {
            await transaction.rollback();
            return res.status(400).json({ message: "lad_id and user_id are required." });
        }
    
        const ladder = await Ladder.findOne({
            where: { lad_id, lad_user_id },
            transaction 
        });


        if (!ladder) {
            await transaction.rollback();
            return res.status(404).json({ message: "Ladder not found or not modified successfully" });
        }


        if (new_step_size !== undefined && new_step_size !== null) {
            ladder.lad_step_size = new_step_size;  
        }
        if (new_target_price !== undefined && new_target_price !== null) {
            ladder.lad_target_price = new_target_price;  
        }
        if (new_order_size !== undefined && new_order_size !== null) {
            ladder.lad_default_buy_sell_quantity = new_order_size;  
        }
        
        // console.log("Updated Ladder Data:", ladder);

        
        await ladder.save({ transaction });
        await transaction.commit();

       
        return res.status(200).json({ message: "Ladder modified successfully", data:ladder });

    } catch (error) {
       
        await transaction.rollback();
        console.error('Error modifying ladder', error);
        return res.status(500).json({ message: "Failed to modify ladder", error: error.message });
    }
};

module.exports = { modifyLadder };
