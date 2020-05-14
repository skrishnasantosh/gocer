using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Skybean.Gocer.Models
{
    public class OrganizationModel
    {
        [Key]
        [MaxLength(32)]
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [MaxLength(128)]
        [Required]
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [MaxLength(128)]
        [Required]
        [JsonPropertyName("country")]
        public string Country { get; set; }

        [MaxLength(128)]
        [Required]
        [JsonPropertyName("address")]
        public string Address{ get; set; }
            
        [MaxLength(128)]
        [Required]
        [JsonPropertyName("province")]
        public string Province { get; set; }

        [MaxLength(128)]
        [Required]
        [JsonPropertyName("city")]
        public string City { get; set; }

        [MaxLength(8)]
        [Required]
        [JsonPropertyName("zipCode")]
        public string ZipCode { get; set; }

        [Required]
        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [Required]
        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }

        [MaxLength(128)]
        [Required]
        [JsonPropertyName("category")]
        public string Category { get; set; }
                
        [JsonPropertyName("createdTime")]
        public DateTime CreatedTime { get; set; }

        
        [JsonPropertyName("lastBookedTime")]
        public DateTime? LastBookedTime { get; set; }

        
        [JsonPropertyName("lastUpdatedTime")]
        public DateTime? LastUpdatedTime { get; set; }


        [JsonPropertyName("rating")]
        public double Rating { get; set; }


        [MaxLength(128)]        
        [JsonPropertyName("logoImage")]
        public string LogoImage { get; set; }
    }
}
