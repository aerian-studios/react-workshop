# End to End testing (E2E)

See [README.md](../smashtest/README.md) in the smashtest directory for
instructions on how to run the E2E tests in this repo.

## What?

In our analogy of washing the dishes, if **unit testing** is testing the tap
turns, the hot water is on, etc (testing in isolation) and **integration
testing** is turn on tap and check for hot water, hot soapy water cleans
crockery, etc (testing the links between code)... then E2E testing is like
running a sink of water and checking that we can clean a glass and a plate and
some cutlery and a pan and then pulling the plug in the sink.

That is to say E2E testing is testing key flows in our application in the actual
environment in which they will be used, from End To End; or more explicitly,
real life user, in a real browser, doing all the steps for each of the key
**user journeys** for our application.

Typically, even with the excellent new tooling available, E2E tests take long to
write and long to run, but they give us a lot of confidence in the key flows of
our application under test because they ensure all parts are working together.
This makes them expensive but valuable. The usual recommendation is to test the
key user journeys through your app... eg. _The user searches for "awesome
product", when the search results appear, the user can click "buy" and then
check out..._, etc

E2E frameworks typically run in real browsers (or as close them as possible) and
typically cover many steps at a time. The will be hitting real APIs wherever
possible. We'll be looking at using the E2E framework, SmashTest, on the
[Aerian site rebuild](https://beta.aerian.com).

## What now?

We need to bear in mind that E2E tests are still relatively expensive, so the
main skills in writing E2E tests are:

-   Focusing on key user stories
-   Writing tests that exercise all the systems that are key to those user
    stories
-   Cleaning up after yourself

I think it is fair to say most E2E tests test expected functionality works
rather than the unexpected, breaking cases. That said, in a well designed
system, the breaking cases will be defined and therefore under test...

## What does it look like?

Well, as we are supposed to focus on key user stories, let's look at the site
and define some key stories as the first step.

For the purposes of this we should assume that we have 3 types of user:

1. A client who knows us (from a RFP or some such)
2. A potential client who doesn't know us
3. A person with interest in our area of work

So let's make a couple of stories for each of these users - spend some time
thinking about this because it is the basis of all your E2E tests.

### 1. Known client

1. As a known client I want to be able to see the quality and breadth of
   existing work within my area of interest so that I can judge the
   appropriateness of working with Aerian
2. As a known client I want to see a bit more information on the proposed team
   for my project

### 2. Unknown client

1. As a potential client I want to see the work that Aerian produce so that I
   can judge whether or not to use them
2. As a potential client I want to be able to easily contact Aerian so that I
   can discuss working with them

### 3. Interested party

1. As an interested party I want to look at Aerian's work for ideas within my
   field of interest.
2. As an interested party I want to enjoy exploring the site as part of my
   general interest

Using those **user stories** we can then configure **user journeys** to fulfill
their wishes. The process of making the user journey can be informative about
the UX of the application; e.g. if there are many steps, this might be
indication that your app is not well suited to that user!

## A user walks into a bar...

Writing a user journey is essentially explicitly stating all the steps that a
user must take to reach their goal.

As I mentioned before, tests can, and arguably should, act as documentation for
your application; E2E tests document the key user journeys. With that in mind
let's write out a user journey that would represent a key use case for our
application and then look at using SmashTest to replace this step.

The most common story for all our users is the ability to look at Aerian's work.
There are differences in the way that each user would approach this, but let us
write the fundamental journey from the home page.

1. User visits the site (either with URL or via search)
2. User scrolls the home page
3. User hovers a card for more information, doesn't discover more information,
   but sees that there is a button to see more
4. User clicks the button
5. User visits the project page

At this point, depending on the user, the journey my branch:

6a. User clicks on "Launch Project" in the case study summary. 6b. User scrolls
down the page and discovers more projects, repeat steps 2 - 5. 6c. User scrolls
down the page and clicks the "Contact us" button 7c1. User chooses to phone us
7c2. User choses to email us 7c3. User chooses to click on our Facebook page
7c4. User chooses to click on our Twitter page 7c5. User chooses to click on our
Vimeo page 7c6. User chooses to click on our LinkedIn page  
You can see how quickly E2E tests can become complicated!

## Hulk SMASH!

Right, so now let's look at how SmashTest can help us with this. There is
[a fair amount of setup](https://smashtest.io/getting-started/setup) needed to
get SmashTest up and running.

```smash
# user1.smash
Open Firefox
    Navigate to "https://beta.aerian.com"
```

As you can see, that is a very readable set of steps... Smash test implements
the idea of "steps" and "branches" to structure your tests. Steps are indented
and branches are on the same level. If we add a branch to our script that will
cause everything thereafter to be run for each branch - a good example is to
open multiple browsers:

```smash
# user1.smash
Open Firefox
Open Chrome
    Navigate to "https://beta.aerian.com"
```

Now both Chrome and Firefox will run the next step. With just these simple
concepts we can now build up our user journey in a simple and readable way.

```smash
# user1.smash
Open Firefox
Open Chrome
    Navigate to "https://beta.aerian.com"
        Hover over [a, "/our-work/project/bananaman-chase-in-space"]
            click [a, "/our-work/project/bananaman-chase-in-space"]
```

Notice how the steps match our user journey really well? But notice also that we
have to target the link URL rather than something more indicative of a user
interaction. This shows one great side-effect of writing these sort of tests. We
have demonstrated that our page is not accessible. What we should be doing it
adding an `aria-label` to the link, which will mean that visually imparaired
users can see what the link is for, and has the side-effect of letting Smashtest
see it too. We will make a note to ask the developers to do this, but in the
meantime we will target the link URL.

You can also see that we had to write the selector for the anchor tag out twice.
SmashTest gives us syntax to make things even more readable; `functions` (like
named steps) and `props`. Let's look at how that helps with readability and
focuses on user experience. Incidentally, notice that this test is actually
going to break if that project is ever taken down...

## Smashing show

Function declarations are just preceded by a `*` and they can be any string.
This means that we can name our `functions` so that they are very explanatory
and fit our user journeys.

```smash
// user1.smash
* Given any User is at the Aerian rebuild site
    Open browser
        Navigate to aerian site rebuild

    * Open browser

        $ Open Chrome
        Open Firefox

            Desktop #desktop
            Mobile #mobile

    * Navigate to aerian site rebuild
        Navigate to 'https://beta.aerian.com'
            On Aerian homepage

        * On Aerian homepage {
            props({
                'carousel item': `a[href="/our-work/project/bananaman-chase-in-space"]`,
            });
        }
            // verify that the element is on the page
            Verify 'carousel item' is visible

            * User explores carousel item
                Hover over then click on 'carousel item'

* Hover over then click on {{element}}
    Hover over {{element}}
        Click {{element}}


* User clicks on the external launch project link
    Wait until [a, "Launch project"] is visible
        Scroll to [span, "Case study"]
            Hover over then click on [a, "Launch project"]

* User decides to contact us
    Wait until [a, "Contact us"] is visible
        Hover over then click on [a, "Contact us"]

// Now actually call the functions - this could be in a separate file
Given any User is at the Aerian rebuild site
    User explores carousel item
        User clicks on the external launch project link
        User decides to contact us
```

As you can see the syntax is such that we can write our E2E tests as if they
were user journeys.

Given branching, we can now easily represent the branching of our different
users at each stage.

### Task

Write out some branches from our user journey

## Beyond the basics

SmashTest provides a great number of ways to
[find elements](https://smashtest.io/ui-testing/elementfinders) and
[other APIs](https://smashtest.io/ui-testing/code-reference) such as time
mocking, storage, etc. For example we can run the tests visibly and with
screenshots like so
`smashtest --test-server=http://localhost:4444/wd/hub --headless=false --screenshots=true`

It even provides ways to simulate
[network issues](https://smashtest.io/ui-testing/network-conditions-and-throttling),
[test APIs](https://smashtest.io/api-testing) or
[mock APIs](https://smashtest.io/ui-testing/mocking-apis) though ideally there
will be as little mocking as possible. It is even possible to extend SmashTest
by writing one's own packages.

## When is it right to Smash things up?

End To End tests are useful in that they test real situations in real browsers
in real environments and the closer that they can get to the real thing, the
better. To this end they are often run on production-like environments (or even
production itself). This means the aim is to limit mocking to an absolute
minimum.

This raises issues like database writes and API limits, but these are not hard
to work around with either clean up scripts or test users.

Ideal times to run E2E tests are CI pipelines, on a git push hook or on a
schedule in the middle of the night (which will act both as an availability test
and E2E test). Running on a schedule can be useful if you have monitoring,
because it will be accountable.

## Summary

E2E tests are very valuable because they exercise a great deal of code and the
links between that code but also take time and consideration to write as well as
run. Consequently they can be good to test key points of interest in your
application.

SmashTest gives us a very usable way to write the tests and hopefully mitigates
some of the cost.
