using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InfinityPrints.Models
{
    public class tbl_statusModel

    {

        public int StatID { get; set; }
        public string StatName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string EmpName { get; set; }
        public string Reason { get; set; }
        public int OrderID { get; set; }
        public int UserID { get; set; }
    }
}