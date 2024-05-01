using MediatR;
using Microsoft.AspNetCore.SignalR;
using RunHub.Application.Commands.Comments;
using RunHub.Application.Queries.Comments;

namespace RunHub.API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(CreateCommentCommand command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.raceId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var raceID = httpContext.Request.Query["raceId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, raceID);
            var res = new GetCommentsQuery
            {
                RaceId = Int32.Parse(raceID)
            };

            var result = await _mediator.Send(res);
            await Clients.Caller.SendAsync("LoadComments", result.Value);

        }
    }
}
