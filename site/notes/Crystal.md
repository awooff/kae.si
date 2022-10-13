---
title: Crystal Programming Language
description: Crystal is a statically-typed general purpose ruby-family language for the modern age
date: 2022-09-06
tags: 'dev'
---

Crystal heavily utilises the famously clean & pragmatic syntax of Ruby, extended with a strict static type system, simplying & improving the experience of OOP in the ruby paradigm.[^1]

Much like rust, it has a fair amount of type safety built-in; the common case of the billion dollar mistake is simply not possible within the language due to null reference checking embedded into the compiler, as all types can be checked for being nil-able.

## Inheritence

__Everything__ in crystal is an object. Base types, classes, functions, everything.
This is why we can have strong *type casting* such as:

{% raw %}
```crystal
my_num = Int32.new(256)
pp my_num # => 256: Int32

# Which is also equivalent to simply:
num : Int32 = 256

# In crystal, the space after the declaration is required
# otherwise it will be inferred as a property selector.
```

Similarly, we can write the same space within memory; i.e:

```crystal
string = IO::Memory.new "hihi!" # In crystal, calling functions with parens is optional.
io.pos # => 0
io.gets 2 # => "hi"
```
{% endraw %}

We can extend this logic into more high-level components by creating our *own* classes, in crystal known as `abstract` classes.
These are classes that essentially define the structure & data that all subsequent classes __must__ have.

In a real-world context, this may be useful when instantiating several types of the same object. However, it is __not__ recommended to use abstract classes as base blueprints for other objects/classes, which will be covered a bit later.

A *good* example of using `abstract` data types is shown here;

{% raw %}
```crystal
abstract class Engine
  def initialize(@name : String, @version : String)
    property memthread : Fiber
  end

  abstract def run

  abstract def stop
end

class RustEngine : Engine
  def initialize(@name = "CTEngine", @version = "0.1.0")
    memthread = Fiber.new
  end

  def run
    spawn name: @name do
      memthread.timeout 12.seconds
    end
  end

  def stop
    # Halt the engine execution by stopping a fiber.
    memthread.yield
  end
end
```
{% endraw %}

### Avoid encapsulation

Encapsulation is something that should __always__ be avoided in Object-Oriented Programming, unless you __really__ know what you are doing. The most common nightmare it can cause is a hierarchy of dependencies, cross-cutting to share values & extend from other classes & in turn, shared mutable state.
Which, as every Java programmer knows, is a special layer of hell.

Say for example you are using encapsulation techniques to write an inventory for a pet store, and you wish to archive all the animals within the store, with optimised searching for an ORM. With encapsulation, one's first thought would be to make a base class for `Animal`, as this helps with ORM pattern searching.

```crystal
abstract class Animal
  property legs, arms, nose
end

class Cat : Animal
  property meow
  # Defining the properties of a cat
end

class Dog : Animal
  property bark
end
```

So far so good. However, the main issue occurs when there is an animal that shares the properties of both
types of animal; for example, an animal that could have the qualities of both a cat and dog; and be listed as either a cat or a dog would require having to first go through the tree to derive from both animal, then cat, then dog, then whatever else was before, which makes objects extremely hard to debug and maintain long-term longevity.

```crystal
class CatDog : ???
```

## Macros

Finally, crystal's intuitive macro system works extremely well for polmorphic & dynamically generated code during runtime.
For example, in the use of creating a html template:

{% raw %}
```crystal
macro iteration(name, max_limit)
  def {{name}}
    iter = 0
    breakpoint = iter / rand({{max_limit}})
    loop do
      iter += 1
      break if iter == {{max_limit}}
      break if iter == breakpoint
    end
    return iter
  end
end

iteration below_1200, 1200
puts below_1200
```
{% endraw %}

## Package management

Crystal also has a modern package management system, known as `shards`, which are modules, binaries & libraries for the language.[^2]

To set up a crystal project, the easiest way to do this is also with `shards`, by running:
`shards init --app`, or with `--lib` to generate a library package with crystal's in-built test suite.

This suite can be accessed & used by writing test cases within the `spec` folder of your newly generated project.


[^1]: Take a look at the [Crystal language reference](<https://crystal-lang.org/reference/1.5/syntax_and_semantics/index.html>) for a complete overview of the language.
[^2]: [Crystal API specification](<https://crystal-lang.org/api/1.5.0/index.html>)
