// backend/models/AuditLog.js
module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define("AuditLog", {
    user_name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    risk_id: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "audit_logs",
    timestamps: false
  });
  return AuditLog;
};
