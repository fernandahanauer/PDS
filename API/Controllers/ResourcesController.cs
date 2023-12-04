using Domain;
using Domain.DTO;
using Domain.Enum;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace RHAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class ResourcesController : ControllerBase
    {
        private Service.Service _resourceService;
       
        public ResourcesController()
        {
            _resourceService = new Service.Service();
        }

        [HttpGet]
        [Route("resource/get/{resourceId}")]
        public Resource GetResource(string resourceId)
        {
            return _resourceService.GetResource(resourceId);
        }


        [HttpGet]
        [Route("resource/list")]
        public IEnumerable<ResourceListDTO> List()
        {
            return _resourceService.ListResource();
        }

        [HttpGet]
        [Route("skill/list")]
        public IEnumerable<Skill> ListSkill()
        {
            return _resourceService.ListSkills();
        }

        [HttpGet]
        [Route("project/list")]
        public IEnumerable<Project> ListProject()
        {
            return _resourceService.ListProject();
        }

        [HttpGet]
        [Route("positions/list")]
        public IEnumerable<Position> Positions()
        {
            return _resourceService.ListPositions();
        }

        //POSTS
        [HttpPost]
        [Route("resource/update/{resourceId}/info")]
        public Resource UpdateResource(string resourceId, ResourceUpdateInfoDTO resource)
        {
            return _resourceService.UpdateResource(resourceId, resource);
        }

        [HttpPost]
        [Route("resource/project/add/{resourceId}")]
        public Resource ResourceAddToProject(string resourceId, ResourceAddProjectDTO resource)
        {
            return _resourceService.ResourceAddToProject(resourceId, resource);
        }

        [HttpPost]
        [Route("resource/position/addfullfillment/{positionId}")]
        public Position ResourceAddToPosition(string positionId, List<string> resourcesIds)
        {
            return _resourceService.ResourceAddToPosition(positionId, resourcesIds);
        }

        [HttpPost]
        [Route("resource/position/tobehired/{positionId}")]
        public Position PositionToBeHired(string positionId, ToBeHiredDTO toBeHired)
        {
            return _resourceService.PositionToBeHired(positionId, toBeHired.ToBeHired);
        }

        [HttpPost]
        [Route("resource/project/update/{resourceId}/setCurrent/{projectId}")]
        public Resource ResourceSetCurrentProject(string resourceId, string projectId)
        {
            return _resourceService.SetCurrentProject(resourceId, projectId);
        }

        [HttpPost]
        [Route("resource/update/{resourceId}/comment")]
        public Resource UpdateResource(string resourceId, ProfileComentDTO comment)
        {
            return _resourceService.UpdateComment(resourceId, comment.Comment);
        }

        [HttpPost]
        [Route("resource/update/{resourceId}/vacation")]
        public Resource UpdateVacation(string resourceId, ResourceAddVacation vacation)
        {
            return _resourceService.AddVacation(resourceId, vacation);
        }

        [HttpDelete]
        [Route("resource/delete/{resourceId}/vacation/{vacationIndex}")]
        public Resource RemoveVacation(string resourceId, int vacationIndex)
        {
            return _resourceService.RemoveVacation(resourceId, vacationIndex);
        }

        [HttpDelete]
        [Route("resource/delete/{resourceId}/project/{projectHistoryIndex}")]
        public Resource RemoveProject(string resourceId, int projectHistoryIndex)
        {
            return _resourceService.RemoveProject(resourceId, projectHistoryIndex);
        }
    }
}
