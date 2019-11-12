using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace WMaxZimmerman.Site.DAL.Repositories
{
    public interface IResourceRepository
    {
        IEnumerable<string> GetResourceFileLines(string filename);
        string GetResourceFileContents(string filename);
        IEnumerable<string> GetResourceNames();
    }


    public class ResourceRepository: IResourceRepository
    {
        private Assembly _assembly;

        public ResourceRepository()
        {
            _assembly = this.GetType().Assembly;
        }

        public IEnumerable<string> GetResourceFileLines(string filename)
        {
            using (var stream = _assembly.GetManifestResourceStream(filename))
            {
                using (var sr = new StreamReader(stream))
                {
                    return sr.ReadToEnd().Split('\n').Select(l => l.Replace("\r", ""));
                }
            }
        }

        public string GetResourceFileContents(string filename)
        {
            using (var stream = _assembly.GetManifestResourceStream(filename))
            {
                using (var sr = new StreamReader(stream))
                {
                    return sr.ReadToEnd();
                }
            }            
        }

        public IEnumerable<string> GetResourceNames()
        {
            return _assembly.GetManifestResourceNames();
        }
    }
}
