# frozen_string_literal: true
module Extensions::DuplicationTraceable::ActiveRecord::Base
  module ClassMethods
    def acts_as_duplication_traceable
      acts_as :duplication_traceable, class_name: DuplicationTraceable.name

      extend DuplicationTraceableClassMethods
      include DuplicationTraceableInstanceMethods
    end
  end

  module DuplicationTraceableClassMethods
    def dependent_class
      raise NotImplementedError, 'Subclasses must implement a dependent_class method.'
    end
  end

  module DuplicationTraceableInstanceMethods
    extend ActiveSupport::Concern
    def source
      source_id && self.class.dependent_class.constantize.find(source_id)
    end

    def source=(item)
      self.source_id = item.id
    end
  end
end
