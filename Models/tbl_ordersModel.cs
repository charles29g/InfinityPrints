using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InfinityPrints.Models
{
    public class tbl_ordersModel
    {

        public int OrderID { get; set; }
        public int UserID { get; set; }

        public int FileQuantity { get; set; }
        public string FilePath { get; set; }
        public string Size { get; set; }
        public int TotalPrice { get; set; }
        public string Request { get; set; }
        public DateTime CreatedAt { get; set; }
        public int StatusID { get; set; }
        public string Service { get; set; }

        public string AdditionalRequests { get; set; }
        public string CompanyName { get; set; }
        public string PaymentTerm { get; set; }
        public string Quantity { get; set; }




    }
}