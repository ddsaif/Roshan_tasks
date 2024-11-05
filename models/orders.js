const { sequelizeInstance } = require("../../util/database");
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const { dd_registrations } = require("../user/registrationModel");
const { dd_ticker_list } = require("../symbolModels/symbolModel");
const { dd_positions } = require("../position/positionModels");
const { dd_ladders_implementation } = require("../ladder/ladderModels");

const dd_orders = sequelizeInstance.define(
  "dd_orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_type: {
      type: DataTypes.ENUM("BUY", "SELL"),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM("OPEN", "CLOSED", "CANCELED"),
      allowNull: false,
    },
    order_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dd_registrations",
        key: "reg_id",
      },
    },
    order_position_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dd_positions",
        key: "postn_id",
      },
    },
    order_ladder_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dd_ladders_implementation",
        key: "lad_id",
      },
    },
    order_automated: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    order_open_price: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    order_trading_mode: {
      type: DataTypes.ENUM("SIMULATION", "PRACTICEMARKET", "REALMARKET"),
      allowNull: false,
    },
    order_units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_closed_units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_cash_gain: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    order_execution_price: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: true,
    },
    order_extra_cash_generated: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    order_realized_profit: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    order_exchange: {
      type: DataTypes.ENUM("NSE", "BSE"),
      allowNull: false,
    },
    order_ticker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dd_ticker_list",
        key: "ticker_id",
      },
    },
    order_stock_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    order_ladder_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "001",
    },
    order_follow_up: {
      type: DataTypes.ENUM("Buy&Sell", "NO_FOLLOW_UP"),
      allowNull: false,
      defaultValue: "Buy&Sell",
    },
    next_ladder_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    previous_ladder_order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW,
    },
  },
  {
    tableName: "dd_orders",
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);
const dd_orders_auxiliary = sequelizeInstance.define(
  "dd_orders_auxiliary",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_type: {
      type: DataTypes.ENUM("BUY", "SELL"),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM("OPEN", "CLOSED", "CANCELED"),
      allowNull: false,
    },
    order_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dd_registrations",
        key: "reg_id",
      },
    },
    order_position_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dd_positions",
        key: "postn_id",
      },
    },
    order_ladder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dd_ladders_implementation",
        key: "lad_id",
      },
    },
    order_automated: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    order_open_price: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    order_trading_mode: {
      type: DataTypes.ENUM("SIMULATION", "PRACTICEMARKET", "REALMARKET"),
      allowNull: false,
    },
    order_units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_closed_units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_cash_gain: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    order_execution_price: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: true,
    },
    order_extra_cash_generated: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    order_realized_profit: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    order_exchange: {
      type: DataTypes.ENUM("NSE", "BSE"),
      allowNull: false,
    },
    order_ticker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dd_ticker_list",
        key: "ticker_id",
      },
    },
    order_stock_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    order_ladder_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "001",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW,
    },
  },
  {
    tableName: "dd_orders_auxiliary",
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

dd_orders.belongsTo(dd_registrations, { foreignKey: "order_user_id" });
dd_orders.belongsTo(dd_positions, { foreignKey: "order_position_id" });
dd_orders.belongsTo(dd_ladders_implementation, {
  foreignKey: "order_ladder_id",
});
dd_orders.belongsTo(dd_ticker_list, { foreignKey: "order_ticker_id" });

module.exports = { dd_orders, dd_orders_auxiliary };
