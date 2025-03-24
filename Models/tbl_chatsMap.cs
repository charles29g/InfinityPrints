using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;
using InfinityPrints.Models;

namespace InfinityPrints.Models
{
    public class tbl_chatsMap : EntityTypeConfiguration<tbl_chatsModel>
    {
        public tbl_chatsMap()
        {
            HasKey(i => i.chatID);
            ToTable("tbl_chats");
        }
    }
}