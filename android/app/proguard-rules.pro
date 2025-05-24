# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

-keep class expo.modules.** { *; }
-dontwarn expo.modules.**

-keep class com.swmansion.** { *; }
-dontwarn com.swmansion.**

# Optional: keep your app's package (change this to your actual package)
-keep class com.dhavansinghal.** { *; }
-dontwarn com.dhavansinghal.**

# Add any project specific keep options here:


