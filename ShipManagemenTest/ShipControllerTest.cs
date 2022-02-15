using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using ShipManagement.Controllers;
using ShipManagement.Models;
using ShipManagement.Repos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShipManagemenTest
{
    public class ShipControllerTest
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task TestGetAllShips()
        {
            //Arrange
            var res = new List<Ship>()
            {
                new Ship { ID = Guid.NewGuid(), Name = "Titanic", Code = "RRRI-3422-G6", Length = 120, Width = 100 },
                new Ship { ID = Guid.NewGuid(), Name = "Karaboudjan", Code = "OOOI-1221-P9", Length = 40, Width = 22 }
            };

            var mockRepo = new Mock<ShipRepo>();
            var mockLogger = new Mock<ILogger<ShipController>>();
            mockRepo.Setup(repo => repo.GetShips(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(res);
            var controller = new ShipController(mockRepo.Object, mockLogger.Object);

            //Act
            var result = await controller.GetShips(10, 10);

            //Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(2, ((List<Ship>)okResult.Value).Count);
        }
    }
}