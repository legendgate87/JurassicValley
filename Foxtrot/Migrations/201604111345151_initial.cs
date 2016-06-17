namespace Foxtrot.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
           
        }
        
        public override void Down()
        {
            AddColumn("dbo.Dinopedia", "Age", c => c.Int(nullable: false));
            AddColumn("dbo.Dinopedia", "NumberId", c => c.String());
            AddColumn("dbo.Dinopedia", "LetterId", c => c.String());
        }
    }
}
