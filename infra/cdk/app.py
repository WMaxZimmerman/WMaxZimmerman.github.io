#!/usr/bin/env python3

from aws_cdk import core

from stacks.personal_site_stack import PersonalSiteStack


app = core.App()
env = core.Environment(region="us-east-1", account="674855380896")
PersonalSiteStack(app, "personal-site-stack", env=env)

app.synth()
