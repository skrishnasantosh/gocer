using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Skybean.Gocer.Models
{
    [Table("LoginOtp")]
    public class LoginOtpModel
    {
        [Required]
        [MaxLength(16)]        
        [JsonPropertyName("phone")]
        [Key]
        public string PhoneNumber { get; set;  }

        [Required]
        [MaxLength(10)]
        [JsonPropertyName("otp")]
        public string Otp { get; set; }

        [Required]        
        [JsonPropertyName("ts")]
        public DateTime Timestamp { get; set; }
    }

    public class LoginPostModel
    {
        [MaxLength(16)]
        [JsonPropertyName("phone")]
        public string PhoneNumber { get; set; }
    }
}
