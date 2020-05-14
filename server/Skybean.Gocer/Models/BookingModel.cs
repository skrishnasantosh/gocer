using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Skybean.Gocer.Models
{ 

    [Table("Bookings")]
    public class BookingModel
    {        
        [Key]
        [MaxLength(32)]
        [JsonPropertyName("bookingId")]
        public string Id { get; set; }

        [Required]
        [MaxLength(64)]
        [JsonPropertyName("orgId")]        
        public string OrganizationId { get; set; }

        [Required]
        [MaxLength(64)]
        [JsonPropertyName("userId")]
        public string UserId { get; set; }

        [Required]
        [JsonPropertyName("bookingTime")]
        public DateTime DateTimeOfBooking { get; set; }

        [JsonPropertyName("timeStamp")]
        public DateTime Timestamp { get; set; }
    }
}