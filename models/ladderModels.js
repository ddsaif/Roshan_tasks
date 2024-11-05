const { sequelizeInstance } = require("../../util/database");
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const { dd_registrations } = require("../user/registrationModel");
const { dd_ticker_list } = require("../symbolModels/symbolModel");
const { dd_positions } = require("../position/positionModels");
const dd_ladders_implementation = sequelizeInstance.define(
  "dd_ladders_implementation",
  {
    lad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    lad_user_id: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
      references: {
        model: "dd_registrations",
        key: "reg_id",
      },
    },
    lad_definition_id: {
      type: DataTypes.INTEGER, //request
      allowNull: true,
      defaultValue: null,
    },
    lad_position_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dd_positions",
        key: "postn_id",
      },
      defaultValue: null,
    },
    lad_ticker: {
      type: DataTypes.STRING(255), //request  lad_ticker
      allowNull: false,
    },
    lad_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // lad_total_units: {
    //     type: DataTypes.INTEGER,   //request
    //     allowNull: false
    // },
    // lad_total_units_left: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    lad_status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"), //request
      allowNull: false,
      defaultValue: "INACTIVE",
    },
    lad_ticker_id: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
      references: {
        model: "dd_ticker_list",
        key: "ticker_id",
      },
    },
    lad_exchange: {
      type: DataTypes.ENUM("NSE", "BSE"), //request
      allowNull: false,
    },
    lad_trading_mode: {
      type: DataTypes.ENUM("SIMULATION", "PRACTICEMARKET", "REALMARKET"), //request
      allowNull: false,
    },
    lad_cash_allocated: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
    },
    lad_step_size: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
      defaultValue: 1,
    },
    // lad_automated: {
    //     type: DataTypes.TINYINT(1),
    //     allowNull: false,
    //     defaultValue: 1
    // },
    lad_cash_gain: {
      type: DataTypes.DECIMAL(13, 2), //I updated
      allowNull: false,
    },
    lad_cash_left: {
      type: DataTypes.DECIMAL(13, 2), //I updated pluse in //request
      allowNull: false,
    },
    lad_last_trade_price: {
      type: DataTypes.DECIMAL(13, 2), //I updated
      allowNull: true,
    },
    lad_last_trade_order_price: {
      type: DataTypes.DECIMAL(13, 2), //I updated  lad_last_trade_order_price
      allowNull: true,
    },
    lad_minimum_price: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
    },
    lad_extra_cash_generated: {
      type: DataTypes.DECIMAL(13, 2), //I updated //request
      allowNull: false,
      defaultValue: 0,
    },
    lad_realized_profit: {
      type: DataTypes.DECIMAL(13, 2), //I updated
      allowNull: false,
      defaultValue: 0,
    },
    lad_initial_buy_quantity: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
    },
    lad_default_buy_sell_quantity: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
    },
    lad_target_price: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
    },
    lad_num_of_steps_above: {
      type: DataTypes.DOUBLE, //request
      allowNull: false,
    },
    lad_num_of_steps_below: {
      type: DataTypes.INTEGER, //I updated //request
      allowNull: false,
    },
    lad_cash_needed: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
    },
    lad_initial_buy_price: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
    },
    target_price_multiplier: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
    },
    lad_unsold_stock_cash_gain: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
      defaultValue: 0.0,
    },
    lad_current_quantity: {
      type: DataTypes.INTEGER, //I updated
      allowNull: false,
    },
    lad_initial_buy_executed: {
      type: DataTypes.TINYINT, //I updated
      allowNull: false,
      defaultValue: 0,
    },

    // lad_ladder_steps: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },
    // lad_latest_step_no: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // lad_no_of_ladders_open: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // lad_no_of_ladders_closed: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // lad_no_of_steps_completed: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },

    // lad_last_updated: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    // lad_stock_price_updated: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    lad_recent_trade_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lad_reinvest_extra_cash: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    continue_trading_after_hitting_target_price: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    lad_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    lad_recent_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    merged_with_lad_ids: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "dd_ladders_implementation",
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);
const dd_ladders_implementation_auxiliary = sequelizeInstance.define(
  "dd_ladders_implementation_auxiliary",
  {
    lad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    lad_user_id: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
      references: {
        model: "dd_registrations",
        key: "reg_id",
      },
    },
    lad_definition_id: {
      type: DataTypes.INTEGER, //request
      allowNull: true,
      defaultValue: null,
    },
    lad_position_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dd_positions",
        key: "postn_id",
      },
      defaultValue: null,
    },
    lad_ticker: {
      type: DataTypes.STRING(255), //request  lad_ticker
      allowNull: false,
    },
    lad_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // lad_total_units: {
    //     type: DataTypes.INTEGER,   //request
    //     allowNull: false
    // },
    // lad_total_units_left: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    lad_status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"), //request
      allowNull: false,
      defaultValue: "INACTIVE",
    },
    lad_ticker_id: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
      references: {
        model: "dd_ticker_list",
        key: "ticker_id",
      },
    },
    lad_exchange: {
      type: DataTypes.ENUM("NSE", "BSE"), //request
      allowNull: false,
    },
    lad_trading_mode: {
      type: DataTypes.ENUM("SIMULATION", "PRACTICEMARKET", "REALMARKET"), //request
      allowNull: false,
    },
    lad_cash_allocated: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
    },
    lad_step_size: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
      defaultValue: 1,
    },
    // lad_automated: {
    //     type: DataTypes.TINYINT(1),
    //     allowNull: false,
    //     defaultValue: 1
    // },
    lad_cash_gain: {
      type: DataTypes.DECIMAL(13, 2), //I updated
      allowNull: false,
    },
    lad_cash_left: {
      type: DataTypes.DECIMAL(13, 2), //I updated pluse in //request
      allowNull: false,
    },
    lad_last_trade_price: {
      type: DataTypes.DECIMAL(13, 2), //I updated
      allowNull: true,
    },
    lad_last_trade_order_price: {
      type: DataTypes.DECIMAL(13, 2), //I updated  lad_last_trade_order_price
      allowNull: true,
    },
    lad_minimum_price: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
    },
    lad_extra_cash_generated: {
      type: DataTypes.DECIMAL(13, 2), //I updated //request
      allowNull: false,
      defaultValue: 0,
    },
    lad_realized_profit: {
      type: DataTypes.DECIMAL(13, 2), //I updated
      allowNull: false,
      defaultValue: 0,
    },
    lad_initial_buy_quantity: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
    },
    lad_default_buy_sell_quantity: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
    },
    lad_target_price: {
      type: DataTypes.DECIMAL(13, 2), //request
      allowNull: false,
    },
    lad_num_of_steps_above: {
      type: DataTypes.INTEGER, //request
      allowNull: false,
    },
    lad_num_of_steps_below: {
      type: DataTypes.INTEGER, //I updated //request
      allowNull: false,
    },
    lad_cash_needed: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
    },
    lad_initial_buy_price: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
    },
    lad_current_quantity: {
      type: DataTypes.INTEGER, //I updated
      allowNull: false,
    },
    lad_initial_buy_executed: {
      type: DataTypes.TINYINT, //I updated
      allowNull: false,
      defaultValue: 0,
    },
    lad_unsold_stock_cash_gain: {
      type: DataTypes.DECIMAL(13, 2), //request //I updated
      allowNull: false,
      defaultValue: 0.0,
    },

    // lad_ladder_steps: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },
    // lad_latest_step_no: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // lad_no_of_ladders_open: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // lad_no_of_ladders_closed: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // lad_no_of_steps_completed: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },

    // lad_last_updated: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    // lad_stock_price_updated: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    lad_recent_trade_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lad_reinvest_extra_cash: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    lad_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "dd_ladders_implementation_auxiliary",
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

// Define associations
dd_ladders_implementation.belongsTo(dd_registrations, {
  foreignKey: "lad_user_id",
});
dd_ladders_implementation.belongsTo(dd_positions, {
  foreignKey: "lad_position_id",
});
dd_ladders_implementation.belongsTo(dd_ticker_list, {
  foreignKey: "lad_ticker_id",
});

module.exports = {
  dd_ladders_implementation,
  dd_ladders_implementation_auxiliary,
};
