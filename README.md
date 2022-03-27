JS Shaders
===

CPU rendered ASCII art shader writing tool with hot reloading.

Recording: https://youtu.be/4bbClPPAkQI

## Usage

First create a .mjs file that exports a function named `fragment`. The module should have the following TypeScript signature:

```typescript
interface FragmentModule {
  /**
   * Return a mono-chromatic value for a pixel and time index:
   * @param x    The x-coordinate of the pixel (In the range 0..1)
   * @param y    The y-coordinate of the pixel (In the range 0..1)
   * @param time The number of seconds since the start of program execution.
   * @returns    The lightness/darkness of the pixel.
   */
  fragment: (x: number, y: number, time: number) => number;
}
```

Then run the module like so:

`node render.mjs <file.mjs>`

## Console Shots

`node render.mjs ./geo.mjs`:

```
Loaded successfully!
                             ··@@
                           ····@@@@@
                         ······@@@@@@@
                       ········@@@@@@@@@     **&#
                     ···@@  ···@@@   ++@@@ ··+**&#@
                   ···@@    ···@@@     +·@ ··+**&#@@
                 ···@@@@&   ···@@@     ··· ··+**&#@
                 ··@@@@@@#  ···@@@@  ++·····++*&&#@
                 ··@@@@@@@#····@@@@++++····   *&
                ··@@@@@@@@·····@@@@@+++····  @@
                ··@#     ······@@@@@@        @@
                ··@     ·······@@@@@@@@      @@@
               ···    ······&&&&&&&@@@@@@   @@@@
               ··········&&&&&&&&&&&&&@@@@@@@@@@
               ······+&&&&&&&&&&&&&&&&&&&#@@@@@@
              ····&&&&&&      &&**     &&&&&&@@@@
              ·&&&&&&&&      &&&***     &&&&&&&&@
                 &&&&&&&@####&&&****+++&&&&&&
                       &&&&&&&&&***&&&&&
                            &&&&&&&
```

`node render.mjs ./spiral.mjs`:

```
Reloaded successfully!
 @@@@@#################@@@@                  ··++**&##@@
@####&&&&&&&&&&&&&&&&&&&###@@@                ··++*&&##@
#&&&&*******++++++******&&&&##@@@              ··++*&&#@@
&****+++++··········+++++***&&###@@             ··+**&##@@
*+++·····            ·····++***&&#@@             ·++*&&#@@
+···                      ···++*&&##@            ··+**&##@
·                            ··+**&##@           ··+**&##@
                               ·++*&##@           ·++*&##@
                                ··+*&#@@          ·++*&##@
                                 ·++*&#@          ·+**&##@
             @@@@@@@@@@           ·+*&#@         ··+**&#@@
         @@@#####&&&&####@@        +*&#@         ·++*&&#@@
      @@@###&&&*********&&##@      +*&#@        ··+**&##@
    @@###&&***+++········++*&@     +*#@         ·+**&##@
  @@##&&***++···           ·+&@   ·*#@         ·+**&##@@
 @@##&&**++··                 *   *#         ··+**&##@
@##&&**++··                    @+#         ··+**&&#@@
&&**++·              @##&*+·    *·      ··++**&&##@
&**++·             @#&*++     &   #&******&&&##@@
**++·            @##&*+·     #*     @@@###@@@@
*++·            @##&*+·      #*·
*+··           @##&*+·       #&+·                           ··
++·            @#&*++·       @#*+·                        ··++
+··           @@#&*+·        @#&&*+··                  ···+++*
+··           @##&*+·         @##&**++···         ·····+++***&
+·            @##&*+··         @@#&&***++++·····++++++****&&&#
+·            @##&*++·           @@##&&&*************&&&&####@
+·            @@#&&*+··            @@@###&&&&&&&&&&&#####@@@@
+··            @##&**+·                @@@@########@@@@@@
+··            @@#&&*++·
++·             @##&&*++··
++··             @##&&**+··
*+··              @##&&**++··
*++··              @@##&&**++··
```
