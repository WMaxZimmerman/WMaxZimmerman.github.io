using System.Collections.Generic;
using System.Linq;
using WMaxZimmerman.Site.DAL.Repositories;
using WMaxZimmerman.Site.Shared.Models;

namespace WMaxZimmerman.Site.ApplicationCore.Services
{
    public interface IResourceService
    {
        IEnumerable<Link> GetPresentationLinks();
    }
    
    public class ResourceService: IResourceService
    {
        private IResourceRepository _repository;

        public ResourceService()
        {
            _repository = new ResourceRepository();
        }
        
        public IEnumerable<Link> GetPresentationLinks()
        {
            var resources = _repository.GetResourceNames();

            return resources.Select(r => r.Replace("WMaxZimmerman.Site.DAL.resources.articles.", "presentations/"))
                .Select(r => r.Replace(".org", ".html"))
                .Select(r => new Link
                {
                    Location = r,
                    Title = r.Replace("presentations/", "").Replace(".html", "").Replace("-", " ").Replace("_", ": ")
                }); ;
        }
    }
}
