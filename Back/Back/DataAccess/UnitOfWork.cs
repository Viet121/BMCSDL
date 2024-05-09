using Back.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

namespace Back.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext databaseContext;
        public IRepository<SinhVien> SinhVienRepository { get; set; }
        public IRepository<GiaoVien> GiaoVienRepository { get; set; }
        public IRepository<UserForm> UserFormRepository { get; set; }
        public IRepository<MonHoc> MonHocRepository { get; set; }
        public IRepository<LopHocPhan> LopHocPhanRepository { get; set; }
        public IRepository<KetQua> KetQuaRepository { get; set; }
        public IRepository<CTDaoTao> CTDaoTaoRepository { get; set; }
        public IRepository<ChiTietLHP> ChiTietLHPRepository { get; set; }
        public IRepository<CapPhep> CapPhepRepository { get; set; }
        public IRepository<CMT_LHP> CMT_LHPRepository { get; set; }
        public IRepository<ThongBao> ThongBaoRepository { get; set; }
        public IRepository<KetQua2> KetQua2Repository { get; set; }



        public UnitOfWork(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
            SinhVienRepository = new Repository<SinhVien>(databaseContext);
            GiaoVienRepository = new Repository<GiaoVien>(databaseContext);
            UserFormRepository = new Repository<UserForm>(databaseContext);
            MonHocRepository = new Repository<MonHoc>(databaseContext);
            LopHocPhanRepository = new Repository<LopHocPhan>(databaseContext);
            KetQuaRepository = new Repository<KetQua>(databaseContext);
            CTDaoTaoRepository = new Repository<CTDaoTao>(databaseContext);
            ChiTietLHPRepository = new Repository<ChiTietLHP>(databaseContext);
            CapPhepRepository = new Repository<CapPhep>(databaseContext);
            CMT_LHPRepository = new Repository<CMT_LHP>(databaseContext);
            ThongBaoRepository = new Repository<ThongBao>(databaseContext);
            KetQua2Repository = new Repository<KetQua2>(databaseContext);

        }

        public async Task SaveChangesAsync()
        {
            await databaseContext.SaveChangesAsync();
        }

    }
}
