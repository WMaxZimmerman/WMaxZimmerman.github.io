using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using WMaxZimmerman.Site.DAL.Repositories;

namespace WMaxZimmerman.Site.Tests.DAL.Repositories
{
    [TestClass]
    public class ResourceRepositoryTests
    {
        private ResourceRepository _repository;

        [TestInitialize]
        public void Init()
        {
            _repository = new ResourceRepository();
        }

        [TestMethod]
        public void DoSomething()
        {
            var resources = _repository.GetResourceNames().ToList();

            Assert.IsTrue(resources.Count > 0);
        }

        [TestMethod]
        public void DoSomethingElse()
        {
            var fileName = "WMaxZimmerman.Site.DAL.resources.articles.text-is-power.org";
            var contents = _repository.GetResourceFileContents(fileName);

            Assert.IsTrue(contents.Length > 0);
        }

        [TestMethod]
        public void DoSomethingElseAgain()
        {
            var fileName = "WMaxZimmerman.Site.DAL.resources.articles.text-is-power.org";
            var lines = _repository.GetResourceFileLines(fileName);
            var otherlines = new List<string>();

            foreach(var line in lines)
            {
                otherlines.Add(line);
            }

            Assert.IsTrue(otherlines.Count > 0);
        }
    }
}
