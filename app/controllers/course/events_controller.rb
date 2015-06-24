class Course::EventsController < Course::ComponentController
  load_and_authorize_resource :event, through: :course, class: Course::Event.name
  add_breadcrumb :index, :course_lesson_plan_path

  def new #:nodoc:
  end

  def create #:nodoc:
    if @event.save
      redirect_to(course_lesson_plan_path(current_course),
                  success: t('.success', title: @event.title))
    else
      render 'new'
    end
  end

  def edit #:nodoc:
  end

  def update #:nodoc:
    if @event.update_attributes(event_params)
      redirect_to(course_lesson_plan_path(current_course),
                  success: t('.success', title: @event.title))
    else
      render 'edit'
    end
  end

  def destroy #:nodoc:
    if @event.destroy
      redirect_to(course_lesson_plan_path(current_course),
                  success: t('.success', title: @event.title))
    else
      redirect_to(course_lesson_plan_path(current_course),
                  failure: t('.failure'))
    end
  end

  private

  def event_params #:nodoc:
    params.require(:event).
      permit(:event_type, :title, :description, :location, :start_time, :end_time, :published)
  end
end
