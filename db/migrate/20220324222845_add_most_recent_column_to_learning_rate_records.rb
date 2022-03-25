class AddMostRecentColumnToLearningRateRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :course_learning_rate_records, :most_recent, :boolean, default: false, null: false
    add_index :course_learning_rate_records, :most_recent, where: :most_recent # partial index
  end
end
