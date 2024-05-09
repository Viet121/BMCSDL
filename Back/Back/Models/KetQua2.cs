using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Back.Models
{
    [Table("KETQUA")]
    public class KetQua2
    {
        [Key]
        public string maLHP { get; set; }

        [Key]
        public string maSV { get; set; }

        [Column(TypeName = "varbinary(max)")]
        public byte[] diem { get; set; }
    }
}
