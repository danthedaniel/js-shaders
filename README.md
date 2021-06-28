JS Shaders
===

CPU rendered ASCII art shader writing tool with hot reloading.

## Usage

`node render.mjs <file.mjs>`

## Console Shots

`node render.mjs ./marching.mjs`:

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