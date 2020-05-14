using Microsoft.AspNetCore.Mvc;
using Skybean.Gocer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Skybean.Gocer.Controllers
{
    [ApiController]
    [Route("{controller}")]
    public class LoginController : ControllerBase
    {
        string twilioAccountSid = "AC1e6dabeb68147fb8231ef35a392a16c8";
        string twilioAuthToken = "82472e3ed3abd93a651a6ff241ebf6f2";


        [HttpPost]
        public async Task<IActionResult> Post(LoginPostModel postModel)
        {
            var otp = $"{new Random().Next(0, 9)}{new Random().Next(0, 9)}{new Random().Next(0, 9)}" +
                      $"{new Random().Next(0, 9)}{new Random().Next(0, 9)}{new Random().Next(0, 9)}";

            using (var context = new AppContext())
            {
                var model = new LoginOtpModel()
                {
                    PhoneNumber = postModel.PhoneNumber
                };

                if (context.LoginOtpModel.FirstOrDefault(x => x.PhoneNumber.Trim() == postModel.PhoneNumber.Trim()) != null)
                {
                    context.LoginOtpModel.Remove(model);
                    await context.SaveChangesAsync();                    
                }
                            
                model.Otp = otp;
                model.Timestamp = DateTime.UtcNow;

                context.LoginOtpModel.Add(model);
                await context.SaveChangesAsync();
            }

            SendSms(postModel.PhoneNumber, "OTP for Skybean GoSafe is " + otp);

            return Ok(otp);
        }

        [HttpPost]
        [Route("{phoneNumber}")]
        public async Task<IActionResult> Get(string phoneNumber)
        {
            return Ok();
        }


        private void SendSms(string phoneNumber, string sms)
        {
            TwilioClient.Init(twilioAccountSid, twilioAuthToken);

            var message = MessageResource.Create(
                body: sms,
                from: new Twilio.Types.PhoneNumber("+12058786628"),
                to: new Twilio.Types.PhoneNumber(phoneNumber)
            );
        }
    }
}
