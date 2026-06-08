# Release Process

This is repository management documentation for Arey Pi maintainers.
It is not part of the Arey Pi framework policy layer.

## Release Checklist

1. Confirm the working tree is clean.

   ```bash
   git status --short
   ```

2. Check the currently published npm version.

   ```bash
   npm view arey-pi version
   ```

3. Bump the package version.

   ```bash
   npm version minor --no-git-tag-version
   ```

   Use `patch`, `minor`, or `major` according to the release scope.

4. Validate the package.

   ```bash
   bun run check
   npm pack --dry-run
   ```

5. Commit the version bump.

   ```bash
   git add package.json
   git commit -m "chore(release): bump version to X.Y.Z"
   ```

6. Publish to npm.

   ```bash
   npm publish
   ```

   If npm requires OTP,
   authenticate in the browser or run:

   ```bash
   npm publish --otp <code>
   ```

7. Verify npm publication.

   ```bash
   npm view arey-pi version
   ```

8. Create an annotated git tag.

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   ```

9. Push the commit and tag.

   ```bash
   git push origin main
   git push origin vX.Y.Z
   ```

10. Create a GitHub release.

    ```bash
    gh release create vX.Y.Z \
      --title "vX.Y.Z" \
      --generate-notes
    ```

## Ordering Rule

Publish to npm before creating the public GitHub release.

A GitHub release should mean the package is available from npm.
If npm publishing is blocked by OTP or registry issues,
do not publish the GitHub release yet.

## Latest Release

`v0.4.0` has been published to npm and GitHub.

- npm package: `arey-pi@0.4.0`
- git tag: `v0.4.0`
- GitHub release: <https://github.com/alereyleyva/arey-pi/releases/tag/v0.4.0>
