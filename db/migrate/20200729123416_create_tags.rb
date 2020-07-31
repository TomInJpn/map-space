class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :title,null:false
      t.index :title
      t.text :explanation
      t.float :x,null:false
      t.float :y,null:false
      t.references :user,null:false, foreign_key: true

      t.timestamps
    end
  end
end