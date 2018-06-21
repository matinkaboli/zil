#!/usr/bin/env bash
# Use the `ENTRYPOINT` DeploymentConfig environment variable to specify
# which command to run. This enables the same Dockerfile to be used for
# web and worker processes.

# If the entrypoint is `workers`, run the node worker.
if [ "$ENTRYPOINT" = "workers" ]
then
  echo Starting workers
  # Put any commands here to start background workers

# If the entrypoint is blank or `web`, run the web supervisord process.
elif [ -z "$ENTRYPOINT" ] || "$ENTRYPOINT" = "web" ]
then
  echo Starting web
  /usr/bin/supervisord -c /supervisord.conf
else
  echo Error, cannot find entrypoint $ENTRYPOINT to start
fi
