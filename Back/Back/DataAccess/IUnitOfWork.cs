using Back.Models;

namespace Back.DataAccess
{
    public interface IUnitOfWork
    {
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
        Task SaveChangesAsync();
    }
}
