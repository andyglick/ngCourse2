import TaskFilters from './task-filters';
import {
  it,
  describe,
  inject,
  async,
  beforeEachProviders
} from '@angular/core/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';
import {MockTasksService} from '../../mocks/mock-tasks-service';

describe('Testing Task Filter Component', () => {
  let mockTasksService = new MockTasksService();

  beforeEachProviders(() => {
    return MockTasksService.getProvider();
  });

  it(
    'chnage owner and status should update service',
    async(inject(
      [TestComponentBuilder],
      (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TaskFilters).then(
          (componentFixture: ComponentFixture<TaskFilters>) => {
            const instance = componentFixture.debugElement.componentInstance;

            const tasksService = instance.tasksService;

            instance.selectOwner({ target: { value: 'a' } });
            chai.expect(tasksService.owner).to.equal('a');

            instance.selectOwner({ target: { value: 'everyone' } });
            chai.expect(tasksService.owner).to.equal('everyone');

            instance.selectStatus({ target: { value: 'completed' } });
            chai.expect(tasksService.taskStatus).to.equal('completed');

            instance.selectStatus({ target: { value: 'all' } });
            chai.expect(tasksService.taskStatus).to.equal('all');
          });
      }
    ))
  );
});
