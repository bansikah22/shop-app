#!/bin/bash

# Variables - Update these with your repository details and token
GITHUB_USER="your-github-username"
GITHUB_REPO="your-repository-name"
GITHUB_TOKEN="your-personal-access-token"
RELEASE_TAG="v1.0.0" # Update this with the desired release tag
RELEASE_NAME="Release $RELEASE_TAG"
RELEASE_BODY="Automated release triggered by script"
TARGET_BRANCH="main" # The branch you want to create the release from

# Create a new release on GitHub
create_release() {
  echo "Creating new release on GitHub..."

  # Create the release
  response=$(curl -s -X POST "https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO/releases" \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d @- <<EOF
{
  "tag_name": "$RELEASE_TAG",
  "target_commitish": "$TARGET_BRANCH",
  "name": "$RELEASE_NAME",
  "body": "$RELEASE_BODY",
  "draft": false,
  "prerelease": false
}
EOF
  )

  # Parse the response to check for errors
  if echo "$response" | jq -e '.id' > /dev/null; then
    echo "Release created successfully: $(echo "$response" | jq -r '.html_url')"
  else
    echo "Failed to create release: $(echo "$response" | jq -r '.message')"
    exit 1
  fi
}

# Main execution
create_release