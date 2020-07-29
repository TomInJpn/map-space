class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :title,null:false
      t.float :x,null:false
      t.float :y,null:false
      t.integer :user_id,null:false

      t.timestamps
    end
  end
end
