using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InfinityPrints.Models
{
    public class tbl_paymentsModel
    {
        public int OrderID { get; set; }
        public int Amount { get; set; }
        public int PaymentID { get; set; }
        public string ReferenceNo { get; set; }
        public string PaymentStatus { get; set; }
        public string IMG_PayPath { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}