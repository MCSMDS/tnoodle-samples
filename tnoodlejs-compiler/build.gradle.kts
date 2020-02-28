import configurations.Languages.attachRemoteRepositories
import configurations.Languages.attachLocalRepositories
import configurations.Languages.configureJava

import dependencies.Versions.GWT
import dependencies.Versions.TNOODLE_LEGACY

import dependencies.Libraries.TNOODLE_SCRAMBLES_LEGACY
import dependencies.Libraries.TNOODLE_UTILS_LEGACY

import org.wisepersist.gradle.plugins.gwt.Style

description = "Compiles the scramble java code to javascript using GWT."

attachLocalRepositories()
attachRemoteRepositories()

plugins {
    GWT
}

configureJava()

dependencies {
    implementation(TNOODLE_SCRAMBLES_LEGACY)
    implementation(TNOODLE_UTILS_LEGACY)

    val dependentSourceProjects = listOf("tnoodle-scrambles", "tnoodle-svglite", "tnoodle-utils", "scrambler-min2phase", "scrambler-sq12phase", "scrambler-threephase")

    for (depProject in dependentSourceProjects) {
        gwt(group = "org.worldcubeassociation.tnoodle", name = depProject, version = TNOODLE_LEGACY, classifier = "sources")
    }
}

gwt {
    gwtVersion = GWT

    modules("scrambles")

    compiler.strict = true
    compiler.style = Style.PRETTY
}
