using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBug.Models.ViewModel
{
    public class GenericSelectOptions
    {
        public GenericSelectOptions(long id, string nome)
        {
            Value = id;
            Label = nome;
        }

        public long Value { get; set; }
        public string Label { get; set; }
    }
}
