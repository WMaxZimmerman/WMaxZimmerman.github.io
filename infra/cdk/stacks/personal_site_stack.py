from aws_cdk import core
from services.stack_service import StackService


class PersonalSiteStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        StackService.create_stack(self)
