using WMaxZimmerman.Site.ApplicationCore.Services;
using NTrospection.CLI.Attributes;
using System.Linq;

namespace WMaxZimmerman.Site.Console.Controllers
{
    [CliController("resource", "An example of a CLI Controller")]
    public class ResourceController
    {
        private IResourceService _service;
        
        public ResourceController()
        {
            _service = new ResourceService();
        }
        
        [CliCommand("output", "A Hello World for a CLI Project")]
        public void OutputResourceContents(string name)
        {
            var contents = _service.GetBlogContents(name);

            foreach(var line in contents)
            {
                System.Console.WriteLine(line);
            }
        }
        
        [CliCommand("list", "A Hello World for a CLI Project")]
        public void ListAllResources()
        {
            var resources = _service.GetNames();

            foreach(var resource in resources)
            {
                System.Console.WriteLine(resource);
            }
        }

        [CliCommand("blogs", "A Hello World for a CLI Project")]
        public void ListAllBlogs()
        {
            var resources = _service.GetBlogNames();

            foreach(var resource in resources)
            {
                System.Console.WriteLine(resource);
            }
        }
    }
}
