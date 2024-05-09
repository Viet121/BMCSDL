using Back.DataAccess;
using Back.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongBaosController : ControllerBase
    {
        private IUnitOfWork context;
        public ThongBaosController(IUnitOfWork context)
        {
            this.context = context;
        }
        //Hien thi toan bo 
        [HttpGet("[action]")]
        public async Task<IEnumerable<ThongBao>> Get()
        {
            return await context.ThongBaoRepository.GetAsync();
        }

        //Them
        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] ThongBao thongbao)
        {
            try
            {
                await context.ThongBaoRepository.InsertAsync(thongbao);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Hien thi 1 
        [HttpGet("[action]/{maTB}")]
        public async Task<ThongBao> Get([FromRoute] string maTB)
        {
            return await context.ThongBaoRepository.GetSingleAsync(maTB);
        }

        //Sua 
        [Authorize(Roles = "admin")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] ThongBao thongbao)
        {
            try
            {
                context.ThongBaoRepository.Update(thongbao);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Xoa 
        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{maTB}")]
        public async Task<ActionResult> Delete(string maTB)
        {
            try
            {
                await context.ThongBaoRepository.DeleteAsync(maTB);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Tim TB
        [HttpGet("[action]/partial/{partialTieuDe}")]
        public async Task<IEnumerable<ThongBao>> GetByPartialTieuDe([FromRoute] string partialTieuDe)
        {
            var thongBaos = await context.ThongBaoRepository.GetAsync(tb => EF.Functions.Like(tb.tieuDe, $"%{partialTieuDe}%"));
            return thongBaos;
        }
    }
}
