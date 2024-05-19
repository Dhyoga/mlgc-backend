variable "project_id" {
  description = "The ID of the project to deploy to"
  type        = string
}

variable "region" {
  description = "The region to deploy to"
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "image_url" {
  description = "The URL of the Docker image"
  type        = string
}

variable "google_application_credentials" {
  description = "The path to the service account key file"
  type        = string
}
