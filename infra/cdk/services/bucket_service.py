from aws_cdk.aws_s3 import Bucket
from aws_cdk.aws_s3_deployment import (
    BucketDeployment,
    Source
)


class BucketService:
    def create_deployment_bucket(stack, domain, bucket_name):
        bucket = Bucket(
            stack,
            f'PersonalSite{bucket_name}Bucket',
            website_index_document='index.html',
            public_read_access=True,
            bucket_name=domain
        )

        BucketDeployment(
            stack,
            f'PersonalSite{bucket_name}DeployBucket',
            sources=[Source.asset('../../site/public')],
            destination_bucket=bucket
        )

        return bucket

    def create_redirect_bucket(stack, domain, bucket_name):
        bucket = Bucket(
            stack,
            f'PersonalSiteWWW{bucket_name}Bucket',
            website_index_document='index.html',
            public_read_access=True,
            bucket_name=f"www.{domain}"
        )

        BucketDeployment(
            stack,
            f'PersonalSiteWWW{bucket_name}DeployBucket',
            sources=[],
            destination_bucket=bucket,
            website_redirect_location=domain
        )

        return bucket
