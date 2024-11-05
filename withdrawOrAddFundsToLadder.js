const Ladder = require('../model/addSubModel');

const withdrawOrAddFundsToLadder = async (req, res) => {
    try {
        const { lad_id, new_cash_allocated, new_cash_needed, new_order_size, new_step_size } = req.body;
        const lad_user_id = req.params.id; 

        if (!lad_id || !lad_user_id) {
            return res.status(400).json({ message: "lad_id and lad_user_id are required." });
        }

        const ladder = await Ladder.findOne({ where: { lad_id, lad_user_id } });

        if (!ladder) {
            return res.status(404).json({ message: "Ladder not found for the specified user." });
        }

       
        ladder.lad_cash_allocated = new_cash_allocated;   
        ladder.lad_cash_needed = new_cash_needed;         
        ladder.lad_order_size = new_order_size;           
        ladder.lad_step_size = new_step_size;             

        await ladder.save();

        res.status(200).json({ message: "Ladder updated successfully.", ladder });
    } catch (error) {
        console.error("Error updating ladder:", error);
        res.status(500).json({ message: "Error updating ladder", error });
    }
};

module.exports = {
    withdrawOrAddFundsToLadder,
};
