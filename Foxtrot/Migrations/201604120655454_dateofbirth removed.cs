namespace Foxtrot.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dateofbirthremoved : DbMigration
    {
        public override void Up()
        {
            
        }
        
        public override void Down()
        {
            AddColumn("dbo.Dinopedia", "DateOfBirth", c => c.String());
        }
    }
}
