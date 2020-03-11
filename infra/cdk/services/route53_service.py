from aws_cdk.aws_route53 import (
    HostedZone,
    ARecord,
    AaaaRecord,
    RecordTarget
)
from aws_cdk.aws_route53_targets import BucketWebsiteTarget


class Route53Service:
    def create_route53(stack, domain, bucket):
        hosted_zone = HostedZone.fromLookup(
            stack,
            'MyZone',
            domain_name=domain
        )

        ARecord(
            stack,
            f'PersonalSiteARecord',
            zone=hosted_zone,
            target=RecordTarget.from_alias(BucketWebsiteTarget(bucket))
        )

        AaaaRecord(
            stack,
            f'PersonalSiteAaaaRecord',
            zone=hosted_zone,
            target=RecordTarget.from_alias(BucketWebsiteTarget(bucket))
        )
