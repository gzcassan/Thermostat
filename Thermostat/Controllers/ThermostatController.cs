using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc.Formatters.Json;

namespace Thermostat.Controllers
{
    [Produces("application/json")]
    [Route("api/Thermostat")]
    public class ThermostatController : Controller
    {
        public ThermostatController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public static IConfiguration _configuration;

        // GET: api/Thermostat/Control
        [HttpGet("[action]")]
        [Produces("application/json")]
        public JsonResult Control()
        {
            string constr = _configuration["ConnectionStrings:0"];

            TempControl tempControl = new TempControl();
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                con.Open();
                using (MySqlCommand cmd = new MySqlCommand("get_control", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                        tempControl.tempMode = reader.GetInt16("temp_mode");
                        tempControl.tempSetpoint = reader.GetFloat("temp_setpoint");
                        tempControl.tempSource = reader.GetInt16("temp_source");
                        tempControl.fanMode = reader.GetInt16("fan_mode");
                    }
                }
            }
            return Json(tempControl);
        }

        private class TempControl
        {
            public int tempMode;
            public float tempSetpoint;
            public int tempSource;
            public int fanMode;
        }

        // GET: api/Thermostat/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Thermostat/SetTempMode
        [HttpPost("[action]")]
        public void SetTempMode([FromBody]SetTempModeRequest request)
        {
            string constr = _configuration["ConnectionStrings:0"];

            using (MySqlConnection con = new MySqlConnection(constr))
            {
                con.Open();
                using (MySqlCommand cmd = new MySqlCommand("set_temp_mode", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new MySqlParameter
                    {
                        ParameterName = "temp_mode",
                        MySqlDbType = MySqlDbType.UByte,
                        Value = request.mode
                    });
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public class SetTempModeRequest
        {
            public int mode;
        }

        // POST: api/Thermostat/SetTempSource
        [HttpPost("[action]")]
        public void SetTempSource([FromBody]string value)
        {
        }

        // POST: api/Thermostat/SetTempSetpoint
        [HttpPost("[action]")]
        public void SetTempSetpoint([FromBody]string value)
        {

        }

        // POST: api/Thermostat/SetFanMode
        [HttpPost("[action]")]
        public void SetFanMode([FromBody]string value)
        {
        }

        // PUT: api/Thermostat/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
