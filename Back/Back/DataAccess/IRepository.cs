using Back.Models;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Back.DataAccess
{
    public interface IRepository<TEntity> where TEntity : class, new()
    {
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null);
        Task<TEntity> GetSingleAsync(object maSV);
        Task InsertAsync(TEntity entity);
        public void Update(TEntity entity);
        Task DeleteAsync2(Expression<Func<TEntity, bool>> filter);
        Task DeleteAsync(object maSV);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> filter);
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoAsync();
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCountAsync();
        //BMCSDL
        Task<ChiTietLHP> GetSingleAsyncCTLHP(string maLHP);
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCountAsync2(Expression<Func<LopHocPhan, bool>> filter = null);
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanDetailsAsync(string maLHP);
        Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsAsync(string maLHP);
        //BMCSDL
        Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsAsync2(string maLHP);
        Task<LopHocPhan> GetSingleLopHocPhanByTimeAsync(string maGV, string thu, string gio);
        Task<UserForm> GetCredentialsAsync(string email, string password);
        Task<UserForm> GetUserByEmailAsync(string email);
        Task<bool> UpdateUserFormAsync(string email, Action<UserForm> updateAction);
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanByMaGVAsync(string maGV);
        //BMCSDL
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanByMaGVAsync2(string maGV);
        Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsByStudentAsync(string maSV);
        //BMCSDL
        Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsByStudentAsync2(string maSV);
        Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocGiaoVienInfoAsync(Expression<Func<ChiTietLHP, bool>> filter = null);
        Task<bool> DeleteKetQuaByMaLHPAndMaSVAsync(string maLHP, string maSV);
        //BMCSDL
        Task<bool> DeleteKetQuaByMaLHPAndMaSVAsync2(string maLHP, string maSV);
        Task<bool> ExistsKetQuaByMaLHPAndMaSVAsync(string maLHP, string maSV);
        Task<bool> ExistsLopHocPhanBySVThuGioAsync(string maSV, string thu, string gio);
        Task<bool> ExistsLopHocPhanBySVMaMHAsync(string maSV, string maMH);
        //BMCSDL
        Task<bool> ExistsKetQuaByMaLHPAndMaSVAsync2(string maLHP, string maSV);
        //BMCSDL
        Task<bool> ExistsLopHocPhanBySVThuGioAsync2(string maSV, string thu, string gio);
        //BMCSDL
        Task<bool> ExistsLopHocPhanBySVMaMHAsync2(string maSV, string maMH);
        Task<bool> IsSoLuongGreaterThanKetQuaCount(string maLHP);
        Task ImportSinhVienDataAsync(List<SinhVien> sinhVienData);
        Task ImportGiaoVienDataAsync(List<GiaoVien> giaoVienData);
    }
}
