class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :groups do |t|
      t.string :name,null:false
      t.index :name
      t.integer :user_id,null:false

      t.timestamps
    end
  end
end
