from services.route53_service import Route53Service
from services.bucket_service import BucketService


class StackService:
    def create_stack(stack):
        domain = "emacsand.net"

        website_bucket = BucketService.create_deployment_bucket(
            stack,
            domain,
            "Website"
        )

        BucketService.create_redirect_bucket(
            stack,
            domain,
            "Website"
        )

        Route53Service.create_route53(stack, domain, website_bucket)
