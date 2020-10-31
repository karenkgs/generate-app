import FileManager from "./FileManager"

describe('FileManager', () => {
  test('should return error if a template name for project choice is invalid', () => {
    const invalidProjectChoice = 'invalid'

    expect(FileManager.createDirectoryContent('', '', invalidProjectChoice)).toEqual(Error(`Could not find template '${invalidProjectChoice}'`))
  })
})