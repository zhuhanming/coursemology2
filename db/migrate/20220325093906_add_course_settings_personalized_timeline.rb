class AddCourseSettingsPersonalizedTimeline < ActiveRecord::Migration[6.0]
  def change
    create_table :course_settings_personalized_timeline do |t|
      t.references :course, null: false, foreign_key: { references: :courses }
      t.float :min_learning_rate
      t.float :max_learning_rate
      t.float :assessment_submission_weight
      t.float :assessment_grade_weight
      t.float :video_view_percentage_weight
      t.timestamps null: false
    end
  end
end
