using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace InfinityPrints.Models
{
    public class tbl_chatsModel
    {
        public int chatID { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }
        public DateTime createdAt { get; set; }
        public string Chat { get; set; }
        public int? replyTo { get; set; }

        public string unread { get; set; }
        [NotMapped] // Prevents mapping this to the database
        public int SelectedUserID { get; set; }
    }
}
